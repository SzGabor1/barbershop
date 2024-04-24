import React from 'react';

interface Service {
  pk: number;
  name: string;
  description: string;
  price: number;
  duration: string;
}

interface SelectServiceProps {
  services: Service[];
  onSelectService: (selectedService: Service) => void;
}

const SelectService: React.FC<SelectServiceProps> = ({ services, onSelectService }) => {
  const handleServiceSelect = (selectedService: Service) => {
    onSelectService(selectedService);
  };

  return (
    <div className='services'>
      <h2 className="service-title m-2 text-center text-xl">Select a Service:</h2>
      <div className='service-wrapper flex justify-center items-center'>
        <div className="flex flex-wrap">
          {services.map(service => (
            <div key={service.pk} className="service">
              <button onClick={() => handleServiceSelect(service)} className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 mx-2">{service.name}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectService;
