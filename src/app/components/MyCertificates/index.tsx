import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { CircularProgress } from '@mui/material';
import { certificateApi } from 'app/api/certificate-api';
import { parseCertificatesFromSpreadsheet } from 'app/components/MyCertificates/spreadsheet';
import { generateCertificate } from 'app/components/MyCertificates/certificateGenerator';

export function MyCertificates() {
  const { data: certificatesData, isLoading: isCertificatesLoading } =
    certificateApi.useGetAllCertificatesQuery();

  const certificates = parseCertificatesFromSpreadsheet(certificatesData);

  return (
    <Card>
      <CardHeader title="My Certificates" />
      <CardContent>
        {isCertificatesLoading ? (
          <CircularProgress />
        ) : certificates?.length === 0 ? (
          <Typography>You have no certificates</Typography>
        ) : (
          <Table>
            <TableHead sx={{ backgroundColor: colors.grey[100] }}>
              <TableRow>
                <TableCell style={{ width: '75%' }}>Certificate Name</TableCell>
                <TableCell style={{ width: '25%' }}>Language</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certificates?.map((certificate, keyIndex) => (
                <TableRow key={certificate.name}>
                  <TableCell>{certificate.name}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {certificate.languages.map((language, keyIndex) => (
                        <Button
                          key={language}
                          variant="contained"
                          startIcon={<OpenInNewIcon />}
                          onClick={() => {
                            generateCertificate(certificate, language);
                          }}
                        >
                          {language}
                        </Button>
                      ))}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
