// Every repository implements this contract. Services depend on THIS
// interface, never on the concrete Postgres implementation - that's
// the dependency inversion that makes the architecture "clean".

export interface ICreateRepository<TEntity> {
    create(data: Partial<TEntity>): Promise<TEntity>;
}

export interface IReadRepository<TEntity, TId> {
    findById(id: TId): Promise<TEntity | null>;
}

export interface IUpdateRepository<TEntity, TId> {
    update(id: TId, data: Partial<TEntity>): Promise<TEntity | null>;
}

export interface IDeleteRepository<TId> {
    delete(id: TId): Promise<boolean>;
}

export interface IBaseRepository<TEntity, TId>
    extends
        ICreateRepository<TEntity>,
        IReadRepository<TEntity, TId>,
        IUpdateRepository<TEntity, TId>,
        IDeleteRepository<TId> {}

export interface IGetAllRepository<TEntity> {
    findAll(): Promise<TEntity[]>;
}
