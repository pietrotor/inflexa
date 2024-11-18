import { Model } from 'mongoose';
import {
  PaginatedResult,
  PaginationParams,
  PaginationSortEnum,
} from '../interfaces';

export async function paginate<T>(
  model: Model<T>,
  {
    page = 1,
    limit = 10,
    sort = { created_at: PaginationSortEnum.ASC }, // Orden por defecto
    filters = {},
    populate,
    aggregate,
  }: PaginationParams,
): Promise<PaginatedResult<T>> {
  const skip = (page - 1) * limit;

  // Convertir sort "asc" y "desc" en 1 y -1
  const mongoSort: any = Object.fromEntries(
    Object.entries(sort).map(([field, order]) => [
      field,
      order === PaginationSortEnum.ASC ? 1 : -1,
    ]),
  );

  if (aggregate) {
    const pipeline = [
      { $match: filters },
      ...(aggregate || []),
      { $sort: mongoSort },
      { $skip: skip },
      { $limit: limit },
    ];

    const data = await model.aggregate(pipeline);
    const totalDocs = await model.countDocuments(filters);
    return {
      data,
      total: totalDocs,
      page,
      limit,
      totalPages: Math.ceil(totalDocs / limit),
    };
  } else {
    const query = model.find(filters).sort(mongoSort).skip(skip).limit(limit);

    if (populate) {
      query.populate(populate as any);
    }

    const [data, totalDocs] = await Promise.all([
      query.exec(),
      model.countDocuments(filters),
    ]);

    return {
      data,
      total: totalDocs,
      page,
      limit,
      totalPages: Math.ceil(totalDocs / limit),
    };
  }
}
