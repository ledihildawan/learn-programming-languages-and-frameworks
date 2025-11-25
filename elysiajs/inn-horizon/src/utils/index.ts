export declare type Nullable<T = void> = T | null | undefined;

type ExecutionResult<T> = {
  result: T | undefined;
  duration_ms: number;
  status: 'SUCCESS' | 'FAILURE';
};

/**
 * Menjalankan sebuah fungsi async dan mengukur waktu eksekusinya.
 * * @param fn Fungsi async yang akan dijalankan.
 * @returns Promise yang berisi hasil dari fungsi yang dijalankan (result) dan durasi eksekusi (duration_ms).
 */
export async function withDuration<T>(fn: () => Promise<T>): Promise<ExecutionResult<T>> {
  const startTime = process.hrtime.bigint(); // Menggunakan BigInt untuk presisi tinggi

  console.log('====================================', startTime);

  try {
    const result = await fn();

    const endTime = process.hrtime.bigint();

    // Hitung perbedaan waktu dalam nanodetik, lalu konversi ke milidetik
    const duration_ns = endTime - startTime;
    const duration_ms = Number(duration_ns) / 1_000_000;

    return { result, duration_ms, status: 'SUCCESS' };
  } catch (error) {
    // Pastikan error tetap diteruskan jika terjadi
    const endTime = process.hrtime.bigint();
    const duration_ns = endTime - startTime;
    const duration_ms = Number(duration_ns) / 1_000_000;

    // Anda mungkin ingin mencatat durasi bahkan jika terjadi error
    console.error(`Execution failed after ${duration_ms.toFixed(3)}ms`);

    return { result: undefined, duration_ms, status: 'FAILURE' };
  }
}
