import { SliceProptNames } from '../../generators/slice';

type SliceVariationType = { [P in SliceProptNames]: any }[];

const sliceNameBase = `generatorTestingSlice`;

export const sliceVariations = (): SliceVariationType => {
  const variations: SliceVariationType = [
    {
      sliceName: `${sliceNameBase}1`,
      path: ``,
    },
    {
      sliceName: `${sliceNameBase}2`,
      path: `/pages/HomePage`,
    },
    {
      sliceName: `${sliceNameBase}3`,
      path: `/pages/HomePage/Features`,
    },
  ];

  return variations;
};
