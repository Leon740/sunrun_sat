import bgLight from 'src/assets/images/bg/bg_light.jpg';
import bgDark from 'src/assets/images/bg/bg_dark.jpg';
import { useThemeContext } from '@/contexts';
import { Img } from '@/components';

export function Background() {
  const { isLight } = useThemeContext();

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Img src={isLight ? bgLight : bgDark} parentClassName="h-full" innerClassName="min-h-full" />
    </div>
  );
}
