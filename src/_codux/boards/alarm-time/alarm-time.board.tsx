import { createBoard } from '@wixc3/react-board';
import { AlarmTime } from '../../../components/alarm-time/alarm-time';
const a = () => {};

export default createBoard({
    name: 'AlarmTime',
    Board: () => <AlarmTime duration={[0, 5, 0, 0]} alarmID={0} removeAlarm={a} />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 232,
        canvasHeight: 159
    }
});
