import { PartialType } from '@nestjs/mapped-types';
import { CreatePreorderDto } from './create-preorder.dto';

export class UpdatePreorderDto extends PartialType(CreatePreorderDto) {}