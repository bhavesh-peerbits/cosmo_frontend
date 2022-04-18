import Theme from 'app/src/components/Theme';

function ThemeDecorator(props) {
	const { children, themeName } = props;
	return <Theme theme={themeName} children={children} />;
}

export default ThemeDecorator;
