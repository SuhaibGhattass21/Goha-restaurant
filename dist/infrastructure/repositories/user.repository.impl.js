"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
class UserRepositoryImpl {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    create(data) {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }
    findById(id) {
        return this.userRepository.findOne({
            where: { id },
            relations: ["userPermissions"]
        });
    }
    findBy(filter) {
        return this.userRepository.findOne({
            where: filter,
            relations: ["userPermissions"]
        });
    }
    update(id, data) {
        return this.userRepository.findOne({ where: { id } })
            .then(user => {
            if (!user)
                return null;
            Object.assign(user, data);
            return this.userRepository.save(user);
        });
    }
    delete(id) {
        return this.userRepository.delete(id)
            .then(result => result.affected ? true : false)
            .catch(() => false);
    }
    findAll(page, limit) {
        const skip = (page - 1) * (limit || 0);
        return this.userRepository.find({
            skip,
            take: limit || 10,
            relations: ["userPermissions"],
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
//# sourceMappingURL=user.repository.impl.js.map