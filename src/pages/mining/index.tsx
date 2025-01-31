import { useState } from "react";

enum StoneType {
  VerySoft = "Very Soft",
  Soft = "Soft",
  Hard = "Hard",
}

const stoneMultipliers: Record<StoneType, number> = {
  [StoneType.VerySoft]: 75,
  [StoneType.Soft]: 50,
  [StoneType.Hard]: 25,
};

const minerDamage = 4.5;

const calculateVolume = (stoneType: StoneType, userDamage: number): number => {
  const cubicFtPerShift = stoneMultipliers[stoneType];
  return (cubicFtPerShift / minerDamage) * userDamage;
};

const calculateCubesWithPrecision = (
  volume: number,
  cubeSize: number
): number => {
  const thicknessInFeet = 0.25; // Convert 0.25 inches to feet
  const volumePerFace = cubeSize * cubeSize * thicknessInFeet; // Volume for one face
  const totalVolumePerCube = volumePerFace * 5; // Multiply by 5 unexposed sides
  return volume / totalVolumePerCube; // Number of cubes
};

const TimeDisplay = ({
  label,
  value,
  isCubes = false,
}: {
  label: string;
  value: number;
  isCubes?: boolean;
}) => (
  <div className="flex text-left">
    <p className="whitespace-pre">{label}: </p>
    <p className="font-semibold">
      {value.toFixed(2)} {!isCubes && "ft³"}
    </p>
  </div>
);

const StoneSection = ({
  stoneType,
  userDamage,
  description,
  isPrecise,
}: {
  stoneType: StoneType;
  userDamage: number;
  description: string;
  isPrecise: boolean;
}) => {
  const volume = calculateVolume(stoneType, userDamage);

  // Calculate the largest possible cube size
  const largestCubeSize = Math.floor(Math.pow(volume, 1 / 3));

  return (
    <div>
      <p className="whitespace-pre text-lg mt-3">{stoneType} Stone: </p>
      <p className="text-sm mb-2 italic">{description}</p>
      <p className="flex underline">Quantity mined in:</p>
      <TimeDisplay label="8 Hours" value={volume} />
      <TimeDisplay label="1 Hour" value={volume / 8} />
      <p className="flex underline mt-3">Cubes</p>
      {[5, 10, 15, 20].map((size) => {
        const cubes = isPrecise
          ? calculateCubesWithPrecision(volume, size)
          : volume / (size * size * size);
        return (
          <TimeDisplay
            key={size}
            label={`How many ${size}ft cubes in 8 hours`}
            value={cubes}
            isCubes
          />
        );
      })}
      {/* Display the largest possible cube size */}
      <div className="flex text-left">
        <p className="whitespace-pre">Largest cube that can be mined: </p>
        <p className="font-semibold">{largestCubeSize}ft</p>
      </div>
    </div>
  );
};

export const Mining = () => {
  const [userDamage, setUserDamage] = useState<number>(0);
  const [isPrecise, setIsPrecise] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDamage(Number(e.target.value) || 0);
  };

  const handlePrecisionChange = () => {
    setIsPrecise(!isPrecise);
  };

  return (
    <div className="mt-[--navbar-height] justify-center">
      <h1 className="text-3xl font-semibold mb-6">
        Mining Rules with Calculator
      </h1>

      <div className="flex flex-col mb-6">
        <span>
          <p>Sustainable damage per round</p>
          <input
            className="border px-1 text-center"
            id="damage-input"
            type="number"
            onChange={handleChange}
            placeholder="Enter damage"
          />
        </span>

        <span className="flex flex-col pt-6 mx-auto">
          <p>
            Can your damage be applied with precision and around small crevices?
          </p>
          <input
            className="flex h-5"
            type="checkbox"
            checked={isPrecise}
            onChange={handlePrecisionChange}
          />
        </span>
      </div>

      <div className="flex flex-col">
        <StoneSection
          stoneType={StoneType.VerySoft}
          userDamage={userDamage}
          description="slate, calcite, limestone, marble"
          isPrecise={isPrecise}
        />
        <StoneSection
          stoneType={StoneType.Soft}
          userDamage={userDamage}
          description="basalt, obsidian"
          isPrecise={isPrecise}
        />
        <StoneSection
          stoneType={StoneType.Hard}
          userDamage={userDamage}
          description="quartz, granite, gneiss, sandstone"
          isPrecise={isPrecise}
        />
      </div>

      <div className="mt-12 flex flex-col border-t">
        <h2 className="my-6 tracking-[0.15em] text-lg font-semibold">
          The Numbers
        </h2>

        <p className="mx-auto text-lg italic mb-6 tracking-wide w-12/12 lg:w-8/12">
          Within an 8 hour shift a human miner can excavate out the following:
        </p>

        <div className="flex flex-col">
          {Object.entries(stoneMultipliers).map(([type, value]) => (
            <div key={type} className="flex mx-auto">
              <p className="whitespace-pre italic">{type} Stone: </p>
              <p className="font-semibold">{value} ft³</p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-sm italic mb-2">
            We can abstract the progress an average miner makes and what their
            average damage would be with tools. While obviously not a perfect
            parallel to reality, neither is D&D, but this at least gives us a
            method by which to calculate each character's mining speed that
            otherwise isn't listed with the "Tunneler" feature.{" "}
          </p>

          <p className="text-sm italic mb-6">
            A miner might be somewhat stronger than a commoner, as a consequence
            of their profession, putting them at a strength of 12. A pickaxe
            deals 1d6 piercing damage, and with a +1 modifier from 12 strength,
            that puts a miner's damage at an average of 4.5. From there we
            extrapolate the amount they excavate, with each cubic feet excavated
            scaling linearly with damage (divide by miner's damage per round,
            4.5, then multiply by character's damage per round).... that is,
            until "precision" gets involved.
          </p>

          <p className="text-sm italic mb-6">
            A D&D character or creature may have capabilities that give it an
            edge in excavating. If a creature has the ability to mine away at
            the rock with precision and around cramped crevices, they could
            forseeably be able to carve the rock's "faces" instead of chipping
            away at the rock's volume. This allows for far less cubic feet to be
            required to mine, with the requisite that the much larger volume of
            rocks be removable. That might be tricky seeing as a 5ft cube of
            limestone can weigh up to 20,000lbs.
          </p>
        </div>
      </div>
    </div>
  );
};
