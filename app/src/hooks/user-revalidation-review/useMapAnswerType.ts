import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { AnswerApiTypeEnum } from 'cosmo-api/src';

const useMapAnswerType = () => {
	const { t } = useTranslation(['userAdmin', 'userRevalidation', 'applicationInfo']);
	const translateAnswer = useCallback(
		(answer?: AnswerApiTypeEnum) => {
			switch (answer) {
				case 'OK':
					return t('applicationInfo:confirmed');
				case 'LOCK':
					return t('userAdmin:blocked');
				case 'REPORT_ERROR':
					return t('userRevalidation:reported-error');
				case 'MODIFY':
					return t('userRevalidation:change-request');
				default:
					return null;
			}
		},
		[t]
	);

	return { translateAnswer };
};

export default useMapAnswerType;
