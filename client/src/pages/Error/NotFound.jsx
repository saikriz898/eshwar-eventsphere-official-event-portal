import React from 'react';
import ErrorLayout from './ErrorLayout';
import { Search } from 'lucide-react';

const NotFound = () => {
    return (
        <ErrorLayout
            code="404"
            title="Node Not Found"
            description="The requested signal coordinate does not exist in our temporal database. It may have been decommissioned or shifted to another sector."
            icon={Search}
            accentColor="indigo"
        />
    );
};

export default NotFound;
