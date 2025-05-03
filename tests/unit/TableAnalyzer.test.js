import TableAnalyzer from '../../src/core/TableAnalyzer.js'
describe('TableAnalyzer Unit Tests', () => {
  const mockConfig = {
    threshold: 20,
    minSizeBytes: 1048576
  };

  const mockStats = [
    {
      schemaname: 'public',
      relname: 'users',
      dead_tup_percentage: 30,
      n_live_tup: 100,
      n_dead_tup: 900,
      table_size: "5 MB"
    },
    {
      schemaname: 'public',
      relname: 'products',
      dead_tup_percentage: 0,
      n_live_tup: 200,
      n_dead_tup: 0,
      table_size: "100 MB"
    },
    {
      schemaname: 'public',
      relname: 'sellers',
      n_live_tup: 500,
      dead_tup_percentage: 48.447,
      n_dead_tup: 1000,
      table_size: "1 MB"
    },
  ];
  test('should identify fragmented tables', () => {
    const result = TableAnalyzer.analyze(mockStats, mockConfig);
    expect(result).toHaveLength(2);
    expect(result[0].table_name).toBe('users');
    expect(result[1].table_name).toBe('sellers');
  });
});