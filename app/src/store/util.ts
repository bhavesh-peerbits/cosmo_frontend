import { RecoilState } from 'recoil';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetRecoilType<C extends RecoilState<any>> = C extends RecoilState<infer T>
	? T
	: unknown;
