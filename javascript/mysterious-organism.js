const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];

  return dnaBases[Math.floor(Math.random() * 4)];
};

const mockUpStrand = () => {
  const newStrand = [];

  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }

  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    dna,
    specimenNum,

    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const currentBase = this.dna[randomIndex];

      let newBase = returnRandBase();

      while (newBase === currentBase) {
        newBase = returnRandBase();
      }

      this.dna[randomIndex] = newBase;

      return this.dna;
    },

    compareDNA(otherOrganism) {
      let commonDNA = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherOrganism.dna[i]) {
          commonDNA++;
        }
      }

      const percentage = ((commonDNA / this.dna.length) * 100).toFixed(2);

      console.log(`specimen #${this.specimenNum} and specimen #${otherOrganism.specimenNum} have ${percentage}% DNA in common.`);
    },

    willLikelySurvive() {
      const survivalBases = this.dna.filter(base => ['C', 'G'].includes(base));

      const survivalRate = (survivalBases.length / this.dna.length) * 100;

      return survivalRate >= 60;
    },

    complementStrand() {
      const complement = {
        A: 'T',
        T: 'A',
        C: 'G',
        G: 'C'
      };

      return this.dna.map(base => complement[base]);
    },
  };
};

const survivingOrganisms = [];

let specimenCount = 1;

while (survivingOrganisms.length < 30) {
  const newOrganism = pAequorFactory(specimenCount, mockUpStrand());

  if (newOrganism.willLikelySurvive()) {
    survivingOrganisms.push(newOrganism);
  }

  specimenCount++;
}


console.log(survivingOrganisms);


const testOrganism = pAequorFactory(1, mockUpStrand());

console.log('Original Strand:', testOrganism.dna);
console.log('Complementary Strand:', testOrganism.complementStrand());