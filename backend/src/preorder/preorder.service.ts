import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePreorderDto } from './dto/create-preorder.dto';
import { UpdatePreorderDto } from './dto/update-preorder.dto';
import { FilterPreorderDto, PreorderFilter } from './dto/filter-preorder.dto';
import { Prisma } from '../generated/client';

@Injectable()
export class PreorderService {
  constructor(private prismaService: PrismaService) { }

  async create(data: CreatePreorderDto) {
    return this.prismaService.prisma.preorder.create({
      data: {
        ...data,
        status: data.status ?? true,
      },
    });
  }

  async findAll(filterDto: FilterPreorderDto) {
    const { filter, sortBy, sortOrder, page, limit } = filterDto;

    const where: Prisma.PreorderWhereInput = {};
    if (filter === PreorderFilter.ACTIVE) where.status = true;
    else if (filter === PreorderFilter.INACTIVE) where.status = false;

    const orderBy: Prisma.PreorderOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const skip = (page - 1) * limit;

    const [items, total] = await this.prismaService.prisma.$transaction([
      this.prismaService.prisma.preorder.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.prismaService.prisma.preorder.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const preorder = await this.prismaService.prisma.preorder.findUnique({ where: { id } });
    if (!preorder) throw new NotFoundException('Preorder not found');
    return preorder;
  }

  async update(id: string, data: UpdatePreorderDto) {
    await this.findOne(id);
    return this.prismaService.prisma.preorder.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.prisma.preorder.delete({ where: { id } });
  }

  async toggleStatus(id: string) {
    const preorder = await this.findOne(id);
    return this.prismaService.prisma.preorder.update({
      where: { id },
      data: { status: !preorder.status },
    });
  }
}