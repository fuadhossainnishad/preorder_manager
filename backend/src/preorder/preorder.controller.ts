import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PreorderService } from './preorder.service';
import { CreatePreorderDto } from './dto/create-preorder.dto';
import { FilterPreorderDto } from './dto/filter-preorder.dto';
import { UpdatePreorderDto } from './dto/update-preorder.dto';

@Controller('preorders')
export class PreorderController {
  constructor(private readonly preorderService: PreorderService) {}

  @Post()
  create(@Body() createPreorderDto: CreatePreorderDto) {
    return this.preorderService.create(createPreorderDto);
  }

  @Get()
  findAll(@Query() filterDto: FilterPreorderDto) {
    return this.preorderService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preorderService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePreorderDto: UpdatePreorderDto) {
    return this.preorderService.update(id, updatePreorderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.preorderService.remove(id);
  }

  @Patch(':id/toggle-status')
  toggleStatus(@Param('id') id: string) {
    return this.preorderService.toggleStatus(id);
  }
}