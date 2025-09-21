import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPasswordMatching(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isPasswordMatching',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return value === args.object['Password'];
                },
                defaultMessage() {
                    return 'Mật khẩu xác nhận không khớp';
                },
            },
        });
    };
}

export class IsPasswordMatchingConstraint {
    validate(value: any, args: ValidationArguments) {
        return value === args.object['Password'];
    }

    defaultMessage(args: ValidationArguments) {
        return 'Mật khẩu xác nhận không khớp';
    }
}