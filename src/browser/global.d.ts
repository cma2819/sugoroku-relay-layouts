import { BundleNodecgInstance, BundleNodecgConstructor } from './nodecg';

declare global {
  const nodecg: BundleNodecgInstance;
  const NodeCG: BundleNodecgConstructor;
}