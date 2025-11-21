/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 16/11/2025 - 01:41:15
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
 * Hero ECG – sharp realistic spikes:
 * - dips BEFORE the spike
 * - vertical R-wave
 * - vertical S-wave drop
 * - jitter before and after
 * - two spikes (middle + near end)
 * - smooth 6s sweep
 */

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ECG() {
  return (
    <div className="w-[450px] h-[40px] flex items-center">
      <motion.svg
        viewBox="0 0 450 40"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        fill="none"
      >
        <defs>
          <linearGradient id="ecgColor" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#00C4A7" />
            <stop offset="100%" stopColor="#009688" />
          </linearGradient>

          <linearGradient id="ecgFade" x1="0%" x2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <mask id="ecgMask">
            <motion.rect
              width="450"
              height="40"
              fill="url(#ecgFade)"
              initial={{ x: -450 }}
              animate={{ x: 450 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </mask>
        </defs>

        <path
          d="
            M0 20

            L15 22
            L25 18
            L35 21
            L45 19
            L60 20

            L80 23
            L95 20

            L150 25
            L155 35
            L160 -5
            L165 35
            L170 20

            L185 23
            L200 18
            L215 22
            L230 19
            L245 21

            L310 25
            L315 35
            L320 -5
            L325 35
            L330 20

            L345 23
            L360 18
            L375 21
            L390 19
            L410 22

            L450 20
          "
          stroke="url(#ecgColor)"
          strokeWidth="2"
          strokeLinecap="round"
          mask="url(#ecgMask)"
          style={{ filter: "drop-shadow(0 0 3px #00C4A799)" }}
        />
      </motion.svg>
    </div>
  );
}
