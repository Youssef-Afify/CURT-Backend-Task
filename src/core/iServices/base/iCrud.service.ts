export interface ICreateService<TEntity, TCreateDto> {
  create(dto: TCreateDto): Promise<TEntity>;
}

export interface IReadService<TEntity, TId> {
  getById(id: TId): Promise<TEntity>;
}

export interface IUpdateService<TEntity, TId, TUpdateDto> {
  update(id: TId, dto: TUpdateDto): Promise<TEntity>;
}

export interface IDeleteService<TId> {
  delete(id: TId): Promise<void>;
}

export interface ICrudService<TEntity, TId, TCreateDto, TUpdateDto>
  extends
  ICreateService<TEntity, TCreateDto>,
  IReadService<TEntity, TId>,
  IUpdateService<TEntity, TId, TUpdateDto>,
  IDeleteService<TId> { }

export interface IGetAllService<TEntity> {
  getAll(): Promise<TEntity[]>;
}
