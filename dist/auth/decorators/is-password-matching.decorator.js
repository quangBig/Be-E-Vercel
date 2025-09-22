"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPasswordMatchingConstraint = void 0;
exports.IsPasswordMatching = IsPasswordMatching;
const class_validator_1 = require("class-validator");
function IsPasswordMatching(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isPasswordMatching',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return value === args.object['Password'];
                },
                defaultMessage() {
                    return 'Mật khẩu xác nhận không khớp';
                },
            },
        });
    };
}
class IsPasswordMatchingConstraint {
    validate(value, args) {
        return value === args.object['Password'];
    }
    defaultMessage(args) {
        return 'Mật khẩu xác nhận không khớp';
    }
}
exports.IsPasswordMatchingConstraint = IsPasswordMatchingConstraint;
//# sourceMappingURL=is-password-matching.decorator.js.map