import { FC, PropsWithChildren, ReactNode } from 'react';
import { Value, ValuePathProps, ValueProps } from '../../types.ts';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { HexList } from '../../parser/bsv-hex-reader.ts';
import { TypographyOwnProps } from '@mui/material/Typography/Typography';

interface HexProps extends TypographyOwnProps {
  children: string;
}

export const Hex: FC<HexProps> = ({ children, ...props }) => {
  return (
    <Typography variant="overline" sx={{ wordBreak: 'break-word' }} {...props}>
      {children}
    </Typography>
  );
};

interface HexLabeledProps extends HexProps {
  label: string;
}

export const HexLabeled: FC<HexLabeledProps> = ({ children, label }) => {
  return (
    <Typography variant="body1">
      <span style={{ textWrap: 'nowrap' }}>{label}:&nbsp;</span>
      <Hex>{children}</Hex>
    </Typography>
  );
};

interface HexValueProps extends HexLabeledProps {
  value: string;
}

const HexValuedAndLabeled: FC<HexValueProps> = ({ children, value, label }) => {
  return (
    <Typography variant="body1">
      <span style={{ textWrap: 'nowrap' }}>
        {label}: {value} |&nbsp;
      </span>
      <Hex>{children}</Hex>
    </Typography>
  );
};

interface ValueComponentProps<T = number> extends ValueProps<T> {
  label: string;
  path: string[];
}

export const NumberValue: FC<ValueComponentProps> = ({ value: { hex, value }, label, path }) => {
  //I made some mistake with typing, so I need to make this null safe
  const val = {
    hex,
    value: value?.toString() || '',
  };

  return <StringValue value={val} label={label} path={path} />;
};

export const BooleanValue: FC<ValueComponentProps<boolean>> = ({ value: { hex, value }, label, path }) => {
  //I made some mistake with typing, so I need to make this null safe
  const val = {
    hex,
    value: value?.toString() || '',
  };

  return <StringValue value={val} label={label} path={path} />;
};

export const StringValue: FC<ValueComponentProps<string>> = ({ value: { hex, value }, label, path }) => {
  return (
    <Accordion defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMore />} id={path.join('-')}>
        <HexValuedAndLabeled label={label} value={value}>
          {hex}
        </HexValuedAndLabeled>
      </AccordionSummary>
      <AccordionDetails>
        <Stack>
          <HexLabeled label="Hex">{hex}</HexLabeled>
        </Stack>
        <Stack>Value: {value}</Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export const HashValue: FC<ValueComponentProps<string>> = ({ value: { hex, value }, label, path }) => {
  return (
    <Accordion defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMore />} id={path.join('-')}>
        <Typography variant="body1">
          <span>
            {label}: <Hex fontWeight={500}>{value}</Hex> |&nbsp;
          </span>
          <Hex>{hex}</Hex>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack>
          <HexLabeled label="Hex">{hex}</HexLabeled>
        </Stack>
        <Stack>
          <HexLabeled label="Value">{value}</HexLabeled>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export const ScriptValue: FC<ValueComponentProps<string>> = ({ value: { hex, value }, label, path }) => {
  return (
    <Accordion defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMore />} id={path.join('-')}>
        <Typography variant="body1" sx={{ overflowWrap: 'anywhere' }}>
          <span>
            {label}: {value} |&nbsp;
          </span>
          <Hex>{hex}</Hex>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack>
          <Typography variant="body1" sx={{ overflowWrap: 'anywhere' }}>
            <span>Hex:&nbsp;</span>
            <Hex>{hex}</Hex>
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="body1" sx={{ overflowWrap: 'anywhere' }}>
            Value: {value}
          </Typography>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

interface ListValueProps<T> extends ValueComponentProps<HexList<T>> {
  render: (value: Value<T>, itemPath: string[], idx: number) => ReactNode;
}

export const ListValue = <T,>({ label, value, path, render }: ListValueProps<T>) => {
  return (
    <ValueContainer label={label} value={value} path={path}>
      <ListValueCount label={label} value={value.value.count} path={path} />
      <ListValueList label={label} value={value.value.list} path={path} render={render} />
    </ValueContainer>
  );
};

const ListValueCount: FC<ValueComponentProps> = ({ label, value, path }) => {
  return <NumberValue label={`${label} Count`} path={[...path, 'count']} value={value} />;
};

interface ListValueListProps<T> extends ValuePathProps<Value<T>[]> {
  label: string;
  render: (value: Value<T>, itemPath: string[], idx: number) => ReactNode;
}

export const ListValueList = <T,>({ label, value, path, render }: ListValueListProps<T>) => {
  const listPath = [...path, 'list'];
  return (
    <ValueContainer label={`${label} List`} value={value} path={listPath}>
      {value.value.map((it, i) => render(it, [...listPath, i.toString()], i))}
    </ValueContainer>
  );
};

interface ValueContainerProps extends PropsWithChildren {
  value: { hex: string };
  label: string;
  path: string[];
}

export const ValueContainer: FC<ValueContainerProps> = ({ value: { hex }, label, path, children }) => {
  return (
    <Accordion defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMore />} id={path.join('-')}>
        <HexLabeled label={label}>{hex}</HexLabeled>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
