import { IsString, IsNotEmpty, IsInt, Min, IsEnum, IsDateString, IsOptional, IsBoolean } from 'class-validator';
import { PreorderWhen } from '../../generated/enums';

export class CreatePreorderDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @Min(0)
    products: number;

    @IsEnum(PreorderWhen)
    preorderWhen: PreorderWhen;

    @IsDateString()
    startsAt: string;

    @IsOptional()
    @IsDateString()
    endsAt?: string;

    @IsOptional()
    @IsBoolean()
    status?: boolean; // default true
}