import csv from 'csv-parser';
import fs from 'fs';

interface HabitablePlanet {
  kepid: string;
  kepoi_name: string;
  kepler_name: string;
  koi_disposition: string;
  koi_pdisposition: string;
  koi_score: string;
  koi_fpflag_nt: string;
  koi_fpflag_ss: string;
  koi_fpflag_co: string;
  koi_fpflag_ec: string;
  koi_period: string;
  koi_period_err1: string;
  koi_period_err2: string;
  koi_time0bk: string;
  koi_time0bk_err1: string;
  koi_time0bk_err2: string;
  koi_impact: string;
  koi_impact_err1: string;
  koi_impact_err2: string;
  koi_duration: string;
  koi_duration_err1: string;
  koi_duration_err2: string;
  koi_depth: string;
  koi_depth_err1: string;
  koi_depth_err2: string;
  koi_prad: string;
  koi_prad_err1: string;
  koi_prad_err2: string;
  koi_teq: string;
  koi_teq_err1: string;
  koi_teq_err2: string;
  koi_insol: string;
  koi_insol_err1: string;
  koi_insol_err2: string;
  koi_model_snr: string;
  koi_tce_plnt_num: string;
  koi_tce_delivname: string;
  koi_steff: string;
  koi_steff_err1: string;
  koi_steff_err2: string;
  koi_slogg: string;
  koi_slogg_err1: string;
  koi_slogg_err2: string;
  koi_srad: string;
  koi_srad_err1: string;
  koi_srad_err2: string;
  ra: string;
  dec: string;
  koi_kepmag: string;
}

const habitablePlanets: HabitablePlanet[] = [];

function isHabitablePlanet(planet: HabitablePlanet) {
  return (
    planet.koi_disposition === 'CONFIRMED' &&
    Number(planet.koi_insol) > 0.36 &&
    Number(planet.koi_insol) < 1.11 &&
    Number(planet.koi_prad) < 1.6
  );
}

fs.createReadStream('kepler_data.csv')
  .pipe(
    csv({
      skipComments: true,
    })
  )
  .on('data', (planet: HabitablePlanet) => {
    if (isHabitablePlanet(planet)) {
      habitablePlanets.push(planet);
    }
  })
  .on('end', () => {
    console.log(habitablePlanets);
    console.log(habitablePlanets.map((planet) => planet.kepler_name));
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });
