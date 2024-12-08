import { merge } from 'lodash';
// project import
import Button from './Button';
import Typography from './Typography';
import TextField from './TextField';
import Theme from '../theme';

// ==============================|| OVERRIDES - MAIN ||============================== //
export default function ComponentsOverrides() {
  const theme = Theme();  
  return merge(
    Button({ theme }),
    Typography(),
    TextField(),
  );
}