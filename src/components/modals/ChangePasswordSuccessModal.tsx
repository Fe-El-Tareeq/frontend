import { AuthSuccessModal } from "../auth/AuthSuccessModal";

export interface ChangePasswordSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
  onHomeClick?: () => void;
}

export function ChangePasswordSuccessModal({
  isOpen,
  onClose,
  onLoginClick,
  onHomeClick,
}: ChangePasswordSuccessModalProps) {
  return (
    <AuthSuccessModal
      isOpen={isOpen}
      variant="saved"
      onClose={onClose}
      onPrimaryClick={onLoginClick}
      onSecondaryClick={onHomeClick}
    />
  );
}
