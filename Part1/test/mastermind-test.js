//[assignment] write your own unit test to show that your Mastermind variation circuit is working as expected
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { expect, assert } = chai;

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
const { buildPoseidon } = require("circomlibjs");

exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const poseidonHash = async (items) => {
    let poseidon = await buildPoseidon();
    return poseidon.F.toObject(poseidon(items));
  };

const circuitPath = "contracts/circuits/MastermindVariation.circom"

describe("MastermindVariation", () => {
    it("return correct solution hash with valid input: 3 hits x 0 blow", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([salt, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 1,
            pubGuessB: 2,
            pubGuessC: 3,
            pubNumHit: 3,
            pubNumBlow: 0,
            pubSolnHash: solnHash,
        }
        const witness = await circuit.calculateWitness(INPUT, true);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(solnHash)));
    });
    it("return correct solution hash with valid input: 2 hits x 0 blow", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([salt, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 1,
            pubGuessB: 2,
            pubGuessC: 4,
            pubNumHit: 2,
            pubNumBlow: 0,
            pubSolnHash: solnHash,
        }
        const witness = await circuit.calculateWitness(INPUT, true);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(solnHash)));
    });
    it("return correct solution hash with valid input: 1 hit x 1 blow", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([salt, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 1,
            pubGuessB: 3,
            pubGuessC: 4,
            pubNumHit: 1,
            pubNumBlow: 1,
            pubSolnHash: solnHash,
        }
        const witness = await circuit.calculateWitness(INPUT, true);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(solnHash)));
    });
    it("return correct solution hash with valid input: 1 hit x 2 blows", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([salt, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 1,
            pubGuessB: 3,
            pubGuessC: 2,
            pubNumHit: 1,
            pubNumBlow: 2,
            pubSolnHash: solnHash,
        }
        const witness = await circuit.calculateWitness(INPUT, true);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(solnHash)));
    });
    it("return correct solution hash with valid input: 0 hit x 3 blows", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([salt, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 2,
            pubGuessB: 3,
            pubGuessC: 1,
            pubNumHit: 0,
            pubNumBlow: 3,
            pubSolnHash: solnHash,
        }
        const witness = await circuit.calculateWitness(INPUT, true);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(solnHash)));
    });
    it("return correct solution hash with valid input: 0 hit x 2 blows", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([salt, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 2,
            pubGuessB: 3,
            pubGuessC: 4,
            pubNumHit: 0,
            pubNumBlow: 2,
            pubSolnHash: solnHash,
        }
        const witness = await circuit.calculateWitness(INPUT, true);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(solnHash)));
    });
    it("return correct solution hash with valid input: 0 hit x 1 blows", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([salt, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 2,
            pubGuessB: 5,
            pubGuessC: 4,
            pubNumHit: 0,
            pubNumBlow: 1,
            pubSolnHash: solnHash,
        }
        const witness = await circuit.calculateWitness(INPUT, true);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(solnHash)));
    });
    it("return correct solution hash with valid input: 0 hit x 0 blows", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([salt, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 6,
            pubGuessB: 5,
            pubGuessC: 4,
            pubNumHit: 0,
            pubNumBlow: 0,
            pubSolnHash: solnHash,
        }
        const witness = await circuit.calculateWitness(INPUT, true);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(solnHash)));
    });
    it("throw error with incorrect salt", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([123457, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 1,
            pubGuessB: 2,
            pubGuessC: 3,
            pubNumHit: 3,
            pubNumBlow: 0,
            pubSolnHash: solnHash,
        }
        expect(circuit.calculateWitness(INPUT, true)).to.be.eventually.rejected;
    });
    it("throw error with invalid guess: duplicated number", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([salt, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 1,
            pubGuessB: 2,
            pubGuessC: 2,
            pubNumHit: 2,
            pubNumBlow: 1,
            pubSolnHash: solnHash,
        }
        expect(circuit.calculateWitness(INPUT, true)).to.be.eventually.rejected;
    });
    it("throw error with invalid guess: some digits are more than 10", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([salt, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 1,
            pubGuessB: 2,
            pubGuessC: 11,
            pubNumHit: 2,
            pubNumBlow: 0,
            pubSolnHash: solnHash,
        }
        expect(circuit.calculateWitness(INPUT, true)).to.be.eventually.rejected;
    });
    it("throw error with invalid guess: some digits are less than 0", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([salt, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 1,
            pubGuessB: 2,
            pubGuessC: -1,
            pubNumHit: 2,
            pubNumBlow: 0,
            pubSolnHash: solnHash,
        }
        expect(circuit.calculateWitness(INPUT, true)).to.be.eventually.rejected;
    });
    it("throw error with invalid guess: incorrect hits", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([salt, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 1,
            pubGuessB: 2,
            pubGuessC: 4,
            pubNumHit: 3,
            pubNumBlow: 0,
            pubSolnHash: solnHash,
        }
        expect(circuit.calculateWitness(INPUT, true)).to.be.eventually.rejected;
    });
    it("throw error with invalid guess: incorrect blows", async () => {
        const circuit = await wasm_tester(circuitPath);
    
        const solution = [1, 2, 3];
        const salt = 123456;
        const solnHash = await poseidonHash([salt, ...solution]);

        const INPUT = {
            privSolnA: solution[0],
            privSolnB: solution[1],
            privSolnC: solution[2],
            privSalt: salt,
            pubGuessA: 1,
            pubGuessB: 2,
            pubGuessC: 4,
            pubNumHit: 2,
            pubNumBlow: 1,
            pubSolnHash: solnHash,
        }
        expect(circuit.calculateWitness(INPUT, true)).to.be.eventually.rejected;
    });
});