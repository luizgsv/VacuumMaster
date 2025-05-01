import 'dotenv/config'

export default {
  connectionString: process.env.DATABASE_URL, // To test, remove before
  threshold: 20,                                  // % dead tuples
  minSize: '1MB',                                // minSize to be a fragmented table
  minSizeBytes: 1048576,                         // minSize = '1MB' in bytes
  useFullVacuum: false,                         // FullVacuum need close the table *******
}