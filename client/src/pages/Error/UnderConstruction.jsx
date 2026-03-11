import React from 'react';
import ErrorLayout from './ErrorLayout';
import { Construction } from 'lucide-react';

const UnderConstruction = () => {
    return (
        <ErrorLayout
            code="DEV"
            title="Under Construction"
            description="Our architects are currently manifesting this sector. This high-density transmission node is still under architectural finalization."
            icon={Construction}
            accentColor="emerald"
        />
    );
};

export default UnderConstruction;
