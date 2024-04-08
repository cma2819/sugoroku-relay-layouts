import { CreateNodecgConstructor, CreateNodecgInstance } from 'ts-nodecg/browser';
import { ReplicantMap } from '../nodecg/replicants';

export type BundleNodecgInstance = CreateNodecgInstance<
  'sugoroku-relay-layouts',
  never,
  ReplicantMap,
  never
>;

export type BundleNodecgConstructor = CreateNodecgConstructor<
  'sugoroku-relay-layouts',
  never,
  ReplicantMap,
  never
>;