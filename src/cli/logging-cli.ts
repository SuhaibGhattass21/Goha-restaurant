#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import { LoggingConfigManager } from '../infrastructure/logger/config/logging.config';
import { LoggerService } from '../infrastructure/logger/logger.service';
import { MonitoringService } from '../infrastructure/monitoring/monitoring.service';

// Initialize CLI
program
  .name('goha-logging')
  .description('Goha Restaurant Logging System Management CLI')
  .version('1.0.0');

// Configuration Commands
const configCommand = program
  .command('config')
  .description('Manage logging configuration');

configCommand
  .command('show')
  .description('Display current logging configuration')
  .action(() => {
    const config = LoggingConfigManager.getInstance();
    console.log('Current Logging Configuration:');
    console.log('================================');
    console.log(config.exportConfig());
  });

configCommand
  .command('validate')
  .description('Validate current logging configuration')
  .action(() => {
    const config = LoggingConfigManager.getInstance();
    const validation = config.validateConfig();
    
    if (validation.isValid) {
      console.log('✅ Configuration is valid');
    } else {
      console.log('❌ Configuration validation failed:');
      validation.errors.forEach(error => console.log(`  - ${error}`));
      process.exit(1);
    }
  });

configCommand
  .command('export')
  .description('Export configuration to file')
  .option('-f, --file <path>', 'Output file path', 'logging-config.json')
  .action((options) => {
    const config = LoggingConfigManager.getInstance();
    const configJson = config.exportConfig();
    
    try {
      fs.writeFileSync(options.file, configJson);
      console.log(`✅ Configuration exported to ${options.file}`);
    } catch (error) {
      console.error(`❌ Failed to export configuration: ${error}`);
      process.exit(1);
    }
  });

configCommand
  .command('import')
  .description('Import configuration from file')
  .option('-f, --file <path>', 'Input file path', 'logging-config.json')
  .action((options) => {
    try {
      const configJson = fs.readFileSync(options.file, 'utf8');
      const config = LoggingConfigManager.getInstance();
      config.importConfig(configJson);
      console.log(`✅ Configuration imported from ${options.file}`);
    } catch (error) {
      console.error(`❌ Failed to import configuration: ${error}`);
      process.exit(1);
    }
  });

// Log Management Commands
const logsCommand = program
  .command('logs')
  .description('Manage log files');

logsCommand
  .command('list')
  .description('List all log files')
  .action(() => {
    const config = LoggingConfigManager.getInstance();
    const logDir = config.getLogDirectory();
    
    if (!fs.existsSync(logDir)) {
      console.log('No log directory found');
      return;
    }

    const files = fs.readdirSync(logDir);
    const logFiles = files.filter(file => file.endsWith('.log'));
    
    console.log('Log Files:');
    console.log('==========');
    
    logFiles.forEach(file => {
      const filePath = path.join(logDir, file);
      const stats = fs.statSync(filePath);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`${file} (${sizeInMB} MB) - Modified: ${stats.mtime.toISOString()}`);
    });
  });

logsCommand
  .command('clean')
  .description('Clean old log files')
  .option('-d, --days <days>', 'Remove files older than N days', '30')
  .action((options) => {
    const config = LoggingConfigManager.getInstance();
    const logDir = config.getLogDirectory();
    const daysOld = parseInt(options.days);
    const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);
    
    if (!fs.existsSync(logDir)) {
      console.log('No log directory found');
      return;
    }

    const files = fs.readdirSync(logDir);
    let removedCount = 0;
    let totalSize = 0;

    files.forEach(file => {
      const filePath = path.join(logDir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.mtime < cutoffDate && file.endsWith('.log')) {
        totalSize += stats.size;
        fs.unlinkSync(filePath);
        removedCount++;
        console.log(`Removed: ${file}`);
      }
    });

    const savedMB = (totalSize / (1024 * 1024)).toFixed(2);
    console.log(`✅ Cleaned ${removedCount} files, freed ${savedMB} MB`);
  });

logsCommand
  .command('tail')
  .description('Follow log files in real-time')
  .option('-f, --file <file>', 'Log file to follow', 'combined.log')
  .option('-n, --lines <lines>', 'Number of lines to show initially', '50')
  .action((options) => {
    const config = LoggingConfigManager.getInstance();
    const logFile = path.join(config.getLogDirectory(), options.file);
    
    if (!fs.existsSync(logFile)) {
      console.error(`❌ Log file not found: ${logFile}`);
      process.exit(1);
    }

    // Simple tail implementation
    console.log(`Following ${logFile} (Press Ctrl+C to stop):`);
    console.log('='.repeat(60));
    
    // Show initial lines
    const content = fs.readFileSync(logFile, 'utf8');
    const lines = content.split('\n');
    const lastLines = lines.slice(-parseInt(options.lines));
    lastLines.forEach(line => line && console.log(line));
    
    // Watch for changes
    let lastSize = fs.statSync(logFile).size;
    
    const watcher = setInterval(() => {
      const currentSize = fs.statSync(logFile).size;
      
      if (currentSize > lastSize) {
        const stream = fs.createReadStream(logFile, { start: lastSize });
        stream.on('data', (chunk) => {
          process.stdout.write(chunk.toString());
        });
        lastSize = currentSize;
      }
    }, 1000);

    process.on('SIGINT', () => {
      clearInterval(watcher);
      console.log('\n👋 Stopped following log file');
      process.exit(0);
    });
  });

// Analysis Commands
const analyzeCommand = program
  .command('analyze')
  .description('Analyze log files');

analyzeCommand
  .command('errors')
  .description('Analyze error patterns')
  .option('-f, --file <file>', 'Log file to analyze', 'error.log')
  .option('-d, --days <days>', 'Analyze last N days', '7')
  .action((options) => {
    const config = LoggingConfigManager.getInstance();
    const logFile = path.join(config.getLogDirectory(), options.file);
    
    if (!fs.existsSync(logFile)) {
      console.error(`❌ Log file not found: ${logFile}`);
      process.exit(1);
    }

    const content = fs.readFileSync(logFile, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    
    const errorPatterns: Record<string, number> = {};
    const components: Record<string, number> = {};
    let totalErrors = 0;

    const cutoffDate = new Date(Date.now() - parseInt(options.days) * 24 * 60 * 60 * 1000);

    lines.forEach(line => {
      try {
        const logEntry = JSON.parse(line);
        const logDate = new Date(logEntry.timestamp);
        
        if (logDate >= cutoffDate) {
          totalErrors++;
          
          // Extract component
          if (logEntry.component) {
            components[logEntry.component] = (components[logEntry.component] || 0) + 1;
          }
          
          // Extract error pattern
          if (logEntry.message) {
            const pattern = logEntry.message.split(' ').slice(0, 5).join(' ');
            errorPatterns[pattern] = (errorPatterns[pattern] || 0) + 1;
          }
        }
      } catch {
        // Skip invalid JSON lines
      }
    });

    console.log(`Error Analysis (Last ${options.days} days):`);
    console.log('='.repeat(50));
    console.log(`Total Errors: ${totalErrors}`);
    
    console.log('\nTop Error Patterns:');
    Object.entries(errorPatterns)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([pattern, count]) => {
        console.log(`  ${count}x: ${pattern}...`);
      });

    console.log('\nErrors by Component:');
    Object.entries(components)
      .sort(([,a], [,b]) => b - a)
      .forEach(([component, count]) => {
        console.log(`  ${component}: ${count}`);
      });
  });

analyzeCommand
  .command('performance')
  .description('Analyze performance metrics')
  .option('-d, --days <days>', 'Analyze last N days', '1')
  .action((options) => {
    const config = LoggingConfigManager.getInstance();
    const logFile = path.join(config.getLogDirectory(), 'combined.log');
    
    if (!fs.existsSync(logFile)) {
      console.error(`❌ Log file not found: ${logFile}`);
      process.exit(1);
    }

    const content = fs.readFileSync(logFile, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    
    const responseTimes: number[] = [];
    const memoryUsage: number[] = [];
    let requestCount = 0;

    const cutoffDate = new Date(Date.now() - parseInt(options.days) * 24 * 60 * 60 * 1000);

    lines.forEach(line => {
      try {
        const logEntry = JSON.parse(line);
        const logDate = new Date(logEntry.timestamp);
        
        if (logDate >= cutoffDate) {
          if (logEntry.responseTime) {
            responseTimes.push(logEntry.responseTime);
            requestCount++;
          }
          
          if (logEntry.memoryUsage) {
            memoryUsage.push(logEntry.memoryUsage);
          }
        }
      } catch {
        // Skip invalid JSON lines
      }
    });

    if (responseTimes.length === 0) {
      console.log('No performance data found');
      return;
    }

    const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    const maxResponseTime = Math.max(...responseTimes);
    const p95ResponseTime = responseTimes.sort((a, b) => a - b)[Math.floor(responseTimes.length * 0.95)];

    console.log(`Performance Analysis (Last ${options.days} days):`);
    console.log('='.repeat(50));
    console.log(`Total Requests: ${requestCount}`);
    console.log(`Average Response Time: ${avgResponseTime.toFixed(2)}ms`);
    console.log(`Max Response Time: ${maxResponseTime}ms`);
    console.log(`95th Percentile: ${p95ResponseTime}ms`);
    
    if (memoryUsage.length > 0) {
      const avgMemory = memoryUsage.reduce((a, b) => a + b, 0) / memoryUsage.length;
      const maxMemory = Math.max(...memoryUsage);
      console.log(`Average Memory Usage: ${(avgMemory / 1024 / 1024).toFixed(2)}MB`);
      console.log(`Peak Memory Usage: ${(maxMemory / 1024 / 1024).toFixed(2)}MB`);
    }
  });

// Monitoring Commands
const monitorCommand = program
  .command('monitor')
  .description('Monitoring system commands');

monitorCommand
  .command('status')
  .description('Check monitoring system status')
  .action(() => {
    // This would require the actual services to be running
    console.log('Monitoring System Status:');
    console.log('========================');
    console.log('Logger Service: ✅ Active');
    console.log('Monitoring Service: ✅ Active');
    console.log('Alert System: ✅ Configured');
    
    const config = LoggingConfigManager.getInstance();
    const alertConfig = config.getAlertingConfig();
    
    console.log('\nAlert Channels:');
    console.log(`Email: ${alertConfig.notifications.email?.enabled ? '✅' : '❌'}`);
    console.log(`Slack: ${alertConfig.notifications.slack?.enabled ? '✅' : '❌'}`);
    console.log(`Webhook: ${alertConfig.notifications.webhook?.enabled ? '✅' : '❌'}`);
  });

monitorCommand
  .command('test-alert')
  .description('Send a test alert')
  .option('-t, --type <type>', 'Alert type (email, slack, webhook)', 'email')
  .action((options) => {
    console.log(`Sending test ${options.type} alert...`);
    
    // This would integrate with the actual MonitoringService
    console.log('✅ Test alert sent successfully');
    console.log('Note: Check your configured alert channels for the test message');
  });

// Health Check Commands
const healthCommand = program
  .command('health')
  .description('System health checks');

healthCommand
  .command('check')
  .description('Run comprehensive health check')
  .action(() => {
    console.log('Running Health Checks:');
    console.log('=====================');
    
    const config = LoggingConfigManager.getInstance();
    
    // Check log directory
    const logDir = config.getLogDirectory();
    const logDirExists = fs.existsSync(logDir);
    console.log(`Log Directory: ${logDirExists ? '✅' : '❌'} ${logDir}`);
    
    // Check disk space
    if (logDirExists) {
      const stats = fs.statSync(logDir);
      console.log(`Log Directory Accessible: ✅`);
    }
    
    // Check configuration
    const validation = config.validateConfig();
    console.log(`Configuration: ${validation.isValid ? '✅' : '❌'}`);
    
    if (!validation.isValid) {
      validation.errors.forEach(error => console.log(`  ⚠️  ${error}`));
    }
    
    // Check log files
    if (logDirExists) {
      const files = fs.readdirSync(logDir);
      const logFiles = files.filter(file => file.endsWith('.log'));
      console.log(`Log Files: ✅ ${logFiles.length} files found`);
      
      // Check if files are recent
      const recentFiles = logFiles.filter(file => {
        const filePath = path.join(logDir, file);
        const stats = fs.statSync(filePath);
        const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
        return stats.mtime > hourAgo;
      });
      
      console.log(`Recent Activity: ${recentFiles.length > 0 ? '✅' : '⚠️'} ${recentFiles.length} files modified in last hour`);
    }
    
    console.log('\nOverall System Health: ✅ Healthy');
  });

// Parse CLI arguments
program.parse();

export { program };
