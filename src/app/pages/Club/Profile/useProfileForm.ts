import { selectClubInfo } from 'app/slices/club/selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { z } from 'zod';

export const useProfileForm = () => {
  const clubInfo = useSelector(selectClubInfo);

  const [name, setName] = useState(clubInfo!.name);
  const [contactPhone, setContactPhone] = useState(clubInfo!.contactPhone);
  const [city, setCity] = useState(clubInfo!.city);
  const [country, setCountry] = useState(clubInfo!.country);

  const values = () => {
    return {
      name,
      city,
      country,
    };
  };

  const validate = () => {
    const phoneRegExp =
      /^$|^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    const profileSchema = z.object({
      name: z.string().trim().min(1),
      contactPhone: z.optional(z.string().trim().regex(phoneRegExp)),
      city: z.string().trim().optional(),
      country: z.string().trim().optional(),
    });
    const club = values();

    const data = profileSchema.safeParse(club);

    if (!data.success) {
      return {
        success: false,
        errors: data.error.issues.map(i => ({
          field: i.path[0] as string,
          message: i.message,
        })),
      };
    }
    return { success: true, data: data.data };
  };

  return {
    name,
    setName,
    contactPhone,
    setContactPhone,
    city,
    setCity,
    country,
    setCountry,
    values,
    validate,
  };
};
