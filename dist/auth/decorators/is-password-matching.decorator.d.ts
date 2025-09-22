import { ValidationOptions, ValidationArguments } from 'class-validator';
export declare function IsPasswordMatching(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
export declare class IsPasswordMatchingConstraint {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
