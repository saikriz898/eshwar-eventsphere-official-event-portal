import React from 'react';
import ErrorLayout from './ErrorLayout';
import { Cpu } from 'lucide-react';

const ServerError = () => {
    return (
        <ErrorLayout
            code="500"
            title="System Collapse"
            description="Our core processing unit has encountered a critical anomaly while attempting to parse your transmission. Internal engineers have been alerted."
            icon={Cpu}
            accentColor="rose"
        />
    );
};

export default ServerError;
