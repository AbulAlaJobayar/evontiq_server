import { FilterQuery, Query } from 'mongoose';
import moment from 'moment';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm && typeof searchTerm === 'string') {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields', 'dateFilter'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Handle date filtering
    if (typeof this.query.dateFilter === 'string') {
      const dateRange = this.getDateRange(this.query.dateFilter);
      if (dateRange) {
        queryObj['date'] = { $gte: dateRange.start, $lte: dateRange.end };
      }
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-date -time';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  paginate() {
    const page = Math.max(1, Number(this?.query?.page) || 1);
    const limit = Math.max(1, Number(this?.query?.limit) || 10);
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }

  private getDateRange(filter: string): { start: Date; end: Date } | null {
    const now = moment();
    let start: moment.Moment;
    let end: moment.Moment = now.clone();

    switch (filter) {
      case 'today':
        start = now.clone().startOf('day');
        break;
      case 'currentWeek':
        start = now.clone().startOf('week');
        break;
      case 'lastWeek':
        start = now.clone().subtract(1, 'week').startOf('week');
        end = now.clone().subtract(1, 'week').endOf('week');
        break;
      case 'currentMonth':
        start = now.clone().startOf('month');
        break;
      case 'lastMonth':
        start = now.clone().subtract(1, 'month').startOf('month');
        end = now.clone().subtract(1, 'month').endOf('month');
        break;
      default:
        return null;
    }

    return {
      start: start.toDate(),
      end: end.toDate()
    };
  }
}

export default QueryBuilder;