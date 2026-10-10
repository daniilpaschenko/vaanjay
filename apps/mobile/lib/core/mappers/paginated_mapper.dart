import '../entities/paginated.dart';
import '../models/paginated.dart' as data;

extension PaginatedModelMapper<M> on data.Paginated<M> {
  Paginated<E> toEntity<E>(E Function(M item) convert) => Paginated<E>(
        items: items.map(convert).toList(growable: false),
        total: total,
        page: page,
        limit: limit,
        hasMore: hasMore,
      );
}

extension PaginatedEntityMapper<E> on Paginated<E> {
  data.Paginated<M> toModel<M>(M Function(E item) convert) => data.Paginated<M>(
        items: items.map(convert).toList(growable: false),
        total: total,
        page: page,
        limit: limit,
        hasMore: hasMore,
      );
}
