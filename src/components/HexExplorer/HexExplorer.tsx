import { Value } from '../../types.ts';
import { Grid2, styled, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import { BUMPFlags } from '../../parser/bsv-hex-reader.ts';


interface CamelCaseToWordsProps {
  children: string;
  sx?: SxProps<Theme>;
}

const StyledSpan = styled('span')();

const CamelCaseToWords: FC<CamelCaseToWordsProps> = ({ children, sx }) => {
  const words = children.replace(/([A-Z])/g, ' $1').toLowerCase();
  return <StyledSpan sx={sx}>{words}</StyledSpan>;
};

interface HexTooltipProps {
  path: string[];
}

const HexTooltipContent: FC<HexTooltipProps> = ({ path }) => {
  const current = path[path.length - 1];
  return <CamelCaseToWords>{current}</CamelCaseToWords>;
};

interface HexProps {
  path: string[];
  children: string;
}

const Hex: FC<HexProps> = ({ children, path }) => {
  const [params, setParams] = useSearchParams();
  const id = path.join('-');
  const selectedId = params.get('select');
  const isSelected = selectedId === id;
  // const [open, setOpen] = useState(isSelected)

  // const onOpen = !isSelected ? () => setOpen(true) : undefined
  // const onClose = !isSelected ? () => setOpen(false) : undefined

  const onClick = () => {
    const newParams = new URLSearchParams(params);
    params.forEach((value, key) => {
      newParams.set(key, value);
    });
    if (isSelected) {
      newParams.delete('select');
    } else {
      newParams.set('select', id);
    }
    setParams(newParams);
  };

  // return <Tooltip onOpen={onOpen} onClose={onClose} open={open} title={<HexTooltipContent path={path} />} placement="top-end" arrow>
  return <Tooltip title={<HexTooltipContent path={path} />} placement="top-end" arrow>
    <Typography onClick={onClick} variant="overline" className={`hex-part ${children.length > 30 && 'hex-long'} ${isSelected && 'hex-selected'}`}>
      {children}
    </Typography>
  </Tooltip>;
};

interface ArrayHexExplorerProps {
  hex: string;
  path: string[];
  children: unknown[];
}

const ArrayHexExplorer: FC<ArrayHexExplorerProps> = ({ hex, children, path }) => {
  const valueItems = children.filter(isValueType);
  if (valueItems.length !== children.length) {
    console.warn(`Hex part (${hex}) contains unexpected type of items, printing only hex. Under the path ${path.join('/')}`);
    return <Hex path={path}>{hex}</Hex>;
  }

  return (<>
    {valueItems.map((value, index) => (
      <ValueHexExplorer key={index} path={[...path, index.toString()]}>{value}</ValueHexExplorer>
    ))}
  </>);
};

interface ObjectHexExplorerProps {
  path: string[];
  children: object;
}

const ObjectHexExplorer: FC<ObjectHexExplorerProps> = ({ children, path }) => {
  const entries = Object.entries(children);
  const valueEntries = entries.filter(([, value]) => isValueType(value) || isFlagsType(value));
  return (
    <>
      {valueEntries.map(([key, value], index) => (
        <ValueHexExplorer key={index} path={[...path, key]}>{value}</ValueHexExplorer>
      ))}
    </>
  );
};

interface ValueHexExplorerProps {
  path: string[];
  children: Value<unknown>;
}

const ValueHexExplorer: FC<ValueHexExplorerProps> = ({ children: { hex, value }, path }) => {
  if (value == null) {
    console.warn(`Hex part (${hex}) has no value, printing only hex. Under the path ${path.join('/')}`);
    return <Hex path={path}>{hex}</Hex>;
  }
  if (isValueType(value)) {
    console.warn(`Hex part (${hex}) has unexpected value of type value, printing only hex. Under the path ${path.join('/')}`);
    return <Hex path={path}>{hex}</Hex>;
  }
  if (Array.isArray(value)) {
    return <ArrayHexExplorer hex={hex} path={path}>{value}</ArrayHexExplorer>;
  }
  if (isFlagsType(value)) {
    return <Hex path={path}>{hex}</Hex>;
  }
  if (typeof value === 'object') {
    return <ObjectHexExplorer path={path}>{value}</ObjectHexExplorer>;
  }
  //plain value
  return <Hex path={path}>{hex}</Hex>;
};

function isValueType(value: unknown): value is Value<unknown> {
  return value != null && typeof value === 'object' && 'hex' in value && 'value' in value;
}

function isFlagsType(value: unknown): value is BUMPFlags {
  return value != null && typeof value === 'object' && 'txid' in value && 'duplicate' in value;
}

interface HexExplorerProps {
  children: Value<unknown>;
}

export const HexExplorer: FC<HexExplorerProps> = ({ children }) => {
  const style: SxProps<Theme> = {
    overflowWrap: 'anywhere',
    '& .hex-part': {
      fontSize: '1em',
      letterSpacing: '0.2rem',
      '&:hover, &.hex-selected': {
        fontWeight: 'bold',
        letterSpacing: '0.19rem',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s ease-in-out',
        transform: 'scale(1.05)',
        '&.hex-long': {
          letterSpacing: '0.195rem',
        },
      },
    },
  };

  return <Grid2 sx={style}>
    <ValueHexExplorer path={[]}>{children}</ValueHexExplorer>
  </Grid2>;
};
