/**
 * Designer Wizard Demo - FashionOS
 * 
 * Demonstrates the Designer Wizard with integrated portfolio upload
 */

import { DesignerWizard } from './components/designer-wizard/DesignerWizard';

export default function DesignerWizardDemo() {
  const handleComplete = () => {
    console.log('Designer Wizard completed!');
    alert('Designer profile created successfully! ✨');
  };

  return (
    <div className="min-h-screen">
      <DesignerWizard onComplete={handleComplete} />
    </div>
  );
}
