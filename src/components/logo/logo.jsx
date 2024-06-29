import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  // const theme = useTheme();

  // const PRIMARY_LIGHT = theme.palette.primary.light;

  // const PRIMARY_MAIN = theme.palette.primary.main;

  // const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{

        ...sx,
      }}
      {...other}
    >
      <svg style={{
        width: "80%",
        padding: "26px",
        height: "auto"
      }} width="1057" height="457" viewBox="0 0 1057 457" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_465_112)">
          <path d="M228.41 0C102.26 0 0 102.26 0 228.41C0 354.56 102.26 456.82 228.41 456.82C354.56 456.82 456.82 354.56 456.82 228.41C456.82 102.26 354.55 0 228.41 0ZM228.41 438.02C112.64 438.02 18.8 344.17 18.8 228.41C18.8 112.65 112.64 18.8 228.41 18.8C344.18 18.8 438.02 112.65 438.02 228.41C438.02 344.17 344.17 438.02 228.41 438.02Z" fill="url(#paint0_linear_465_112)" />
          <path d="M237.5 159.04C235.82 126.33 220.18 94.57 195.27 73.29C200.72 86.37 194.73 101.45 197.09 115.42C198.8 125.52 204.85 134.49 212.33 141.49C219.81 148.5 228.69 153.8 237.5 159.03V159.04Z" fill="url(#paint1_linear_465_112)" />
          <path d="M297.22 90.8001C307.35 93.8601 315.4 101.43 322.91 108.89C330.42 116.35 338.11 124.17 347.98 127.97C357.86 131.78 370.64 130.34 376.81 121.74C373.29 132.23 361.21 137.57 350.15 137.79C339.09 138.02 328.34 134.44 317.38 132.94C287.26 128.82 255.39 141.74 236.63 165.67C236.96 146.99 239.31 127.56 249.44 111.86C259.57 96.1601 279.34 85.3901 297.22 90.8001Z" fill="url(#paint2_linear_465_112)" />
          <path d="M278.7 133.18C283.37 126.02 285.53 117.56 288.74 109.64C282.11 124.18 271.09 136.67 257.48 145.04C258.37 145.16 259.25 145.16 260.12 145.13C264.77 142.34 269.67 139.97 274.75 138.05C276.23 136.55 277.57 134.91 278.69 133.18H278.7Z" fill="#ADD250" />
          <path d="M285.19 134.8C288.08 134.09 291.01 133.5 293.96 133.08C295.32 132.31 296.62 131.44 297.76 130.38C301.5 126.88 303.82 121.91 304.08 116.79C299.05 123.96 292.57 130.08 285.19 134.8Z" fill="#ADD250" />
          <path d="M314.97 132.7C320.29 130.92 324.82 126.51 325.96 120.97C320.41 125.18 314.51 128.92 308.4 132.26C310.59 132.32 312.79 132.46 314.97 132.69V132.7Z" fill="#ADD250" />
          <path d="M227.82 333.36C230.01 270.31 235.16 207.37 242.75 144.74C218.52 206.67 217.35 274.85 216.49 341.33C216.52 344.96 222.17 346.02 224.79 343.51C227.41 341 227.69 336.98 227.82 333.35V333.36Z" fill="url(#paint3_linear_465_112)" />
          <path d="M370.05 162.57C358.85 174.85 351.83 190.27 345.09 205.46C338.35 220.65 331.55 236.14 320.66 248.69C309.78 261.24 293.95 270.65 277.36 269.68C255.63 268.41 237.48 250.15 215.71 249.62C219.69 228.16 228.39 207.15 243.34 191.24C258.29 175.33 279.96 165.08 301.73 166.72C313.02 167.57 323.93 171.5 335.24 172.09C347.46 172.73 359.87 169.34 370.06 162.56L370.05 162.57Z" fill="url(#paint4_linear_465_112)" />
          <path d="M219.03 247.36C238.98 233.98 262.51 227.26 285.02 218.87C307.53 210.47 330.26 199.54 344.85 180.46C340.34 192.66 330.59 202.35 319.55 209.22C308.51 216.09 296.12 220.43 283.84 224.72C262.24 232.27 240.64 239.81 219.03 247.36Z" fill="#ADD250" />
          <path d="M267.71 215.01C274.56 205.72 281.51 196.23 285.22 185.29C270.56 202.95 255.91 220.6 241.26 238.26C252.72 234.85 260.62 224.64 267.71 215.01Z" fill="#ADD250" />
          <path d="M300.92 208.73C305.02 201.17 309.21 193.35 310.05 184.79C304.03 198.88 294.86 211.62 283.39 221.79C287.21 222.75 291.31 221.05 294.21 218.38C297.11 215.71 299.04 212.18 300.92 208.72V208.73Z" fill="#ADD250" />
          <path d="M260.21 235.01C256.46 233.55 251.96 231.84 248.69 234.19C259.64 238.78 270.82 243.43 282.65 244.46C294.48 245.48 307.3 242.31 315.18 233.42C298.05 241.24 277.76 241.82 260.21 235.01Z" fill="#ADD250" />
          <path d="M331.83 218.35C316.76 221.32 301.23 221.91 285.98 220.08C288.39 223.29 292.28 225.04 296.16 226.08C308.37 229.35 322.08 226.38 331.84 218.35H331.83Z" fill="#ADD250" />
          <path d="M223.38 198.71C216.17 183.04 203.86 169.76 188.78 161.4C173.76 153.08 156.48 149.68 139.37 148.3C122.26 146.91 105.04 147.41 87.8999 146.26C99.6499 158.33 104.27 175.6 106.59 192.28C108.91 208.97 109.45 226.09 114.95 242.01C120.46 257.93 132.29 272.98 148.74 276.56C161.37 279.32 174.42 274.97 186.28 269.82C195.47 265.83 204.54 261.26 212.18 254.78C219.83 248.3 226.01 239.73 228.13 229.93C230.39 219.46 227.85 208.45 223.37 198.72L223.38 198.71Z" fill="url(#paint5_linear_465_112)" />
          <path d="M220.31 245.23C201.89 242.24 185.25 232.06 171.6 219.34C157.95 206.61 146.96 191.35 136.06 176.21C155.16 184.97 164.59 206.36 179.82 220.84C191.29 231.75 205.94 238.58 220.31 245.24V245.23Z" fill="#ADD250" />
          <path d="M202.11 239.67C198.28 224.82 194.45 209.98 190.62 195.13C190.41 207.79 192.21 220.49 195.94 232.59C196.93 235.79 198.76 239.52 202.11 239.67Z" fill="#ADD250" />
          <path d="M173.5 217.74C170.32 205.15 167.15 192.55 163.97 179.96C163.68 186.67 163.39 193.45 164.57 200.07C165.75 206.69 168.53 213.22 173.5 217.74Z" fill="#ADD250" />
          <path d="M158.76 217.07C146.82 217.1 132.81 211.43 122.73 205.04C136.6 218.64 156.68 225.64 176 223.59C175.75 219.66 174.26 218.87 170.48 217.78C166.7 216.69 162.69 217.06 158.75 217.07H158.76Z" fill="#ADD250" />
          <path d="M137.07 228.53C144.29 238.02 155.1 244.71 166.81 246.92C178.53 249.14 193.72 245.86 203.91 239.67C201.72 238.42 197.21 237.54 196.04 235.3C187.1 240.42 176.14 241.02 166.03 239.07C155.92 237.12 146.44 232.81 137.07 228.53Z" fill="#ADD250" />
          <path d="M358.61 395.07C321.98 422.5 275.36 437.9 228.54 438.03C181.72 438.15 135 423 98.21 395.75C113.13 377.34 130.56 360.48 151.25 347.95C171.95 335.42 196.08 327.37 220.69 327.24C247.25 327.1 273.14 336.13 295.9 349.01C318.66 361.88 338.71 378.53 358.61 395.08V395.07Z" fill="#664A3B" />
          <path d="M617.38 359.62V326.93L639.27 325.7V373.5C630.17 378.28 618.76 380.9 605.19 380.9C574.04 380.9 552.3 359.01 552.3 328.94C552.3 298.87 576.2 274.98 606.73 274.98C619.37 274.98 628.93 276.68 638.8 280.84L634.48 299.8C624.77 295.48 616.75 294.09 606.57 294.09C587.14 294.09 575.12 308.28 575.12 328.01C575.12 347.74 587.15 361.47 606.11 361.47C610.43 361.47 613.67 361.01 617.37 359.62H617.38Z" fill="black" />
          <path d="M747.67 276.51V334.64C747.67 362.7 732.56 380.9 702.8 380.9C673.04 380.9 659.32 362.55 659.32 336.34V276.51H681.99V335.26C681.99 350.52 688.62 361.32 703.58 361.32C718.54 361.32 725.01 350.99 725.01 335.72V276.51H747.68H747.67Z" fill="black" />
          <path d="M827.85 358.69H787.61L780.21 379.97L757.7 378.74L796.25 276.51H820.61L858.54 378.74L835.26 380.13L827.86 358.7L827.85 358.69ZM793.62 340.81H821.99L808.11 300.26L793.62 340.81Z" fill="black" />
          <path d="M871.64 277.43C871.64 277.43 892.92 276.04 907.87 276.04C931.61 276.04 947.03 288.38 947.03 308.73C947.03 325.23 938.7 334.79 927.14 339.72L953.97 378.73L930.07 380.12L906.63 344.04H894.3V379.35H871.63V277.43H871.64ZM907.26 324.92C918.82 324.92 924.37 319.21 924.37 309.81C924.37 300.41 918.51 295.16 907.26 295.16C903.41 295.16 894.31 295.47 894.31 295.47V324.92H907.26Z" fill="black" />
          <path d="M966.93 277.43C966.93 277.43 990.21 276.2 1002.08 276.2C1035.54 276.2 1056.66 295.01 1056.66 326.62C1056.66 358.23 1034.77 379.97 1000.69 379.97C988.05 379.97 975.25 379.82 966.92 379.2V277.44L966.93 277.43ZM989.59 360.85H1001.77C1021.81 360.85 1033.84 347.13 1033.84 327.08C1033.84 307.03 1021.97 295.01 1002.08 295.01C996.99 295.01 992.98 295.16 989.59 295.32V360.85Z" fill="black" />
          <path d="M659.16 203.42H597.87L586.6 235.82L552.32 233.94L611.02 78.26H648.12L705.88 233.94L670.42 236.05L659.15 203.41L659.16 203.42ZM607.03 176.18H650.23L629.1 114.42L607.03 176.18Z" fill="black" />
          <path d="M812.48 204.83V155.05L845.82 153.17V225.96C831.97 233.24 814.59 237.23 793.93 237.23C746.5 237.23 713.39 203.89 713.39 158.1C713.39 112.31 749.79 75.92 796.28 75.92C815.53 75.92 830.09 78.5 845.12 84.84L838.55 113.72C823.76 107.15 811.55 105.03 796.05 105.03C766.46 105.03 748.15 126.63 748.15 156.69C748.15 186.75 766.46 207.64 795.35 207.64C801.92 207.64 806.86 206.94 812.49 204.82L812.48 204.83Z" fill="black" />
          <path d="M877.04 79.6801C877.04 79.6801 909.45 77.5701 932.22 77.5701C968.38 77.5701 991.86 96.3601 991.86 127.35C991.86 152.47 979.18 167.03 961.57 174.55L1002.43 233.96L966.03 236.07L930.34 181.12H911.56V234.89H877.04V79.6801ZM931.28 152C948.89 152 957.34 143.31 957.34 128.99C957.34 114.67 948.42 106.68 931.28 106.68C925.41 106.68 911.56 107.15 911.56 107.15V152H931.28Z" fill="black" />
          <path d="M1022.15 78.27H1056.67V234.89H1022.15V78.27Z" fill="black" />
        </g>
        <defs>
          <linearGradient id="paint0_linear_465_112" x1="13.72" y1="306.55" x2="443.1" y2="150.27" gradientUnits="userSpaceOnUse">
            <stop stopColor="#31643F" />
            <stop offset="1" stopColor="#A2C94D" />
          </linearGradient>
          <linearGradient id="paint1_linear_465_112" x1="195.27" y1="116.16" x2="237.5" y2="116.16" gradientUnits="userSpaceOnUse">
            <stop stopColor="#31643F" />
            <stop offset="1" stopColor="#A2C94D" />
          </linearGradient>
          <linearGradient id="paint2_linear_465_112" x1="236.62" y1="127.54" x2="376.8" y2="127.54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#31643F" />
            <stop offset="1" stopColor="#A2C94D" />
          </linearGradient>
          <linearGradient id="paint3_linear_465_112" x1="216.5" y1="244.81" x2="242.76" y2="244.81" gradientUnits="userSpaceOnUse">
            <stop stopColor="#31643F" />
            <stop offset="1" stopColor="#A2C94D" />
          </linearGradient>
          <linearGradient id="paint4_linear_465_112" x1="215.72" y1="216.16" x2="370.05" y2="216.16" gradientUnits="userSpaceOnUse">
            <stop stopColor="#31643F" />
            <stop offset="1" stopColor="#A2C94D" />
          </linearGradient>
          <linearGradient id="paint5_linear_465_112" x1="87.8999" y1="211.84" x2="228.98" y2="211.84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#31643F" />
            <stop offset="1" stopColor="#A2C94D" />
          </linearGradient>
          <clipPath id="clip0_465_112">
            <rect width="1056.66" height="456.81" fill="white" />
          </clipPath>
        </defs>
      </svg>

    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="." sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
