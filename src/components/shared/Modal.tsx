import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * Modal Component
 * 
 * Wrapper around shadcn Dialog for consistent modal behavior.
 * 
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback when modal closes (click outside or Esc)
 * @param children - Modal content
 * @param className - Optional additional classes for DialogContent
 */
export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={className}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
