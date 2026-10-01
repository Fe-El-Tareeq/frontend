import { AuthSuccessModal } from "../auth/AuthSuccessModal";

export interface ResetPasswordSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
}

export function ResetPasswordSuccessModal({
  isOpen,
  onClose,
  onLoginClick,
}: ResetPasswordSuccessModalProps) {
  return (
    <AuthSuccessModal
      isOpen={isOpen}
      variant="changed"
      onClose={onClose}
      onPrimaryClick={onLoginClick}
    />
  );
}
