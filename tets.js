<ref *2> Builder [object] {
  client: <ref *1> Client_PG {
    config: { client: 'pg', connection: [Object] },
    logger: Logger {
      _inspectionDepth: 5,
      _enableColors: true,
      _debug: undefined,
      _warn: undefined,
      _error: undefined,
      _deprecate: undefined
    },
    connectionSettings: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '',
      database: 'smart-brain'
    },
    connectionConfigExpirationChecker: null,
    driver: PG {
      defaults: [Object],
      Client: [Function],
      Query: [class Query extends EventEmitter],
      Pool: [class BoundPool extends Pool],
      _pools: [],
      Connection: [class Connection extends EventEmitter],
      types: [Object]
    },
    pool: Pool {
      destroyed: false,
      emitter: [EventEmitter],
      creator: [AsyncFunction: create],
      destroyer: [Function: destroy],
      validate: [Function: validate],
      log: [Function (anonymous)],
      acquireTimeoutMillis: 60000,
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 200,
      propagateCreateError: true,
      min: 2,
      max: 10,
      used: [],
      free: [],
      pendingCreates: [],
      pendingAcquires: [],
      pendingDestroys: [],
      pendingValidations: [],
      interval: null,
      eventId: 1
    },
    valueForUndefined: Raw [object] {
      client: [Circular *1],
      sql: 'DEFAULT',
      bindings: undefined,
      _wrappedBefore: undefined,
      _wrappedAfter: undefined,
      _debug: undefined
    },
    makeKnex: [Function: makeKnex],
    _events: [Object: null prototype] {
      start: [Function (anonymous)],
      query: [Function (anonymous)],
      'query-error': [Function (anonymous)],
      'query-response': [Function (anonymous)]
    },
    _eventsCount: 4
  },
  and: [Circular *2],
  _single: {
    table: 'users',
    only: false,
    returning: '*',
    insert: {
      email: 'sandra@gmail.com',
      name: 'Sadra',
      joined: 2020-12-12T08:11:56.223Z
    }
  },
  _statements: [],
  _method: 'insert',
  _debug: undefined,
  _joinFlag: 'inner',
  _boolFlag: 'and',
  _notFlag: false,
  _asColumnFlag: false
}