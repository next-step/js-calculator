import useDisplay from '../hooks/useDisplay.js';

export default function modifierHandeler() {
  const $target = document.querySelector('.modifier');
  const { setDisplay } = useDisplay();

  const onClick = () => {
    setDisplay(0);
  };

  $target.addEventListener('click', () => {
    onClick();
  });
}
