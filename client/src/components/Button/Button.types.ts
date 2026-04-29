export default interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'danger' | 'cancel';
  type?: 'button' | 'submit';
}
