import { RecoilState } from 'recoil';

export type GetRecoilType<C extends RecoilState<any>> = C extends RecoilState<infer T>
	? T
	: unknown;
