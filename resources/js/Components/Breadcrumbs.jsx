import React from 'react';
import { Link } from '@inertiajs/react';
import { Icon } from '@iconify/react';

const Breadcrumbs = ({ items, className='bg-outline-gray' }) => {
    return (
        <div className={`w-full rounded-lg ${className} p-3 flex items-center gap-1`}>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <p>/</p>}
                    {item.href ? (
                        <Link href={item.href} className="flex items-center gap-1">
                            {item.icon && (
                                <Icon
                                    icon={item.icon}
                                    className="text-primary-orange text-2xl"
                                />
                            )}
                            {item.label}
                        </Link>
                    ) : (
                        <p className=" line-clamp-1 items-center gap-1">
                            {item.icon && (
                                <Icon
                                    icon={item.icon}
                                    className="text-primary-orange text-2xl"
                                />
                            )}
                            {item.label}
                        </p>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumbs;
