export default {
  threshold: 20,                           // % dead tuples
  minSizeBytes: 1024 * 8,                  // 8 KB, tamanho mínimo em bytes
  useFullVacuum: false,                    // Vacuum completo (opcional)
  // connectionString: process.env.DATABASE_URL, // Remover, pois agora é fornecido pelo usuário via CLI
}
