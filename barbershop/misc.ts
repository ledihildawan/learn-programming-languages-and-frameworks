import { db } from './db'; // Pastikan Anda mengimpor objek db Drizzle

async function addRatingCheckConstraint() {
  const addConstraintSQL = `
    ALTER TABLE reviews
    ADD CONSTRAINT check_rating_range
    CHECK (rating >= 1 AND rating <= 5);
  `;

  await db.query(addConstraintSQL); // Jalankan query raw untuk menambahkan constraint
  console.log('Check constraint added to rating column');
}
