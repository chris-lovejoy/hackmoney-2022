import dynamic from 'next/dynamic';
import { useEthersAppContext } from 'eth-hooks/context';
import { useStateContext } from '../src/context/state';
import { PageWrapper } from '../src/components/PageWrapper';
import {
  PlayInstruction,
  PlayInstructionSimple,
} from '../src/components/PlayInstruction';
import { Typography, Button, ButtonGroup, Alert } from '@mui/material';
import SyncStepDialog from '../src/components/SyncStepDialog';
import ShareDialog from '../src/components/ShareDialog';
import { useRouter } from 'next/router';
import { getAddress } from '../src/helper/getAddress';

import Link from 'next/link';
const EpnsButtonNoSSR = dynamic(() => import('../src/components/EpnsButton'), {
  ssr: false,
});
import { Container, Paper, Box } from '@mui/material';
import { StepLeaderBoard } from '../src/components/StepLeaderboard';
import { YieldLeaderBoard } from '../src/components/YieldLeaderboard';

export default function Home() {
  const ethersAppContext = useEthersAppContext();
  const router = useRouter();
  const isDebug = !!router.query.debug;
  const secret = router.query.debug; // enable for debugging

  const { playerContract, shipsContract, worldContract } = useStateContext();
  return (
    <PageWrapper>
      <Container maxWidth="sm">
        <Box sx={{ height: 10 }} />
        <Alert variant="outlined" severity="warning">
          This is the v2 version of hash-space, starships minted in v1 are
          deprecated. You have to register again to mint a startship to play.
        </Alert>
        <Box sx={{ height: 10 }} />
        <Paper style={{ padding: '10px' }}>
          <SyncStepDialog />
          <ShareDialog />
          <Typography variant="h5" gutterBottom component="div">
            <b>HASH SPACE: The DeFi Explorer</b>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>
              <em>
                Learn about DeFi and earn yield while exploring different
                planets.
              </em>
            </b>
            <br />
            <br />
          </Typography>
          <Typography variant="h6" gutterBottom>
            How to play
          </Typography>
          <Typography variant="body1" gutterBottom>
            Visit different planets to pick up the yield they&apos;ve generated
            since the last visitor. The fuel for your ship comes from your
            real-world steps. At each planet, you&apos;ll learn about the
            protocol used to generate that yield. Explore as many planets as you
            can. You&apos;ll learn about Yearn Finance, MakerDAO, UniSwap, Aave
            and more!
          </Typography>
          {isDebug && (
            <div>
              <hr></hr>
              <h1>user</h1>
              <div>{JSON.stringify(playerContract.playerState)}</div>
              <button
                onClick={() => {
                  location = `${location.protocol}//${location.host}/api/sign?steps=50000&lastTimeSync=${playerContract.playerState?.lastQueried}&secret=${secret}`;
                }}>
                get 50000 steps
              </button>
              <h1>ships</h1>
              <ul>
                {shipsContract.ships.map((ship) => (
                  <li key={ship.id}>
                    <div>{JSON.stringify(ship)}</div>
                    <Link
                      href={{
                        pathname: '/',
                        query: { modal: 'move' },
                      }}>
                      <button>move ship {ship.id}</button>
                    </Link>
                  </li>
                ))}
              </ul>
              <hr></hr>
              <h1>planets</h1>
              <ul>
                {worldContract.planets.map((planet) => (
                  <li key={planet.id}>
                    <div>
                      id: {planet.id}, mapId: {planet.worldMapIndex}, x:{' '}
                      {planet.x}, y: {planet.y}, type; {planet.planetType}
                    </div>
                  </li>
                ))}
              </ul>
              <hr></hr>
              <Link
                href={{
                  pathname: '/',
                  query: { steps: 5000 },
                }}>
                <button>get 5000 steps</button>
              </Link>
              <p>account: {ethersAppContext.account}</p>
              <p>chain: {ethersAppContext.chainId}</p>
              <p>active: {ethersAppContext.active ? 'yes' : 'no'}</p>
            </div>
          )}
        </Paper>
        <Box sx={{ height: 10 }} />
        <Paper style={{ padding: '10px' }}>
          <Typography variant="h5" gutterBottom component="div">
            <b>Play</b>
          </Typography>
          <Alert severity="warning">Only on Polygon Mumbai</Alert>
          <Box sx={{ height: 10 }} />
          <Typography variant="body1">
            Explore different DeFi planets and earn yield
          </Typography>
          <Box sx={{ height: 10 }} />
          <PlayInstruction />
        </Paper>
        <Box sx={{ height: 10 }} />
        <Paper style={{ padding: '10px' }}>
          <Typography variant="h5" gutterBottom component="div">
            <b>View Game</b>
          </Typography>
          <Alert severity="warning">Only on Polygon Mumbai</Alert>
          <Box sx={{ height: 10 }} />
          <Typography variant="body1">
            See what other players are up to and discover the galaxy of planets
          </Typography>
          <Box sx={{ height: 10 }} />
          <PlayInstructionSimple />
        </Paper>
        <Box sx={{ height: 10 }} />
        <Paper style={{ padding: '10px' }}>
          <Typography variant="h5" gutterBottom component="div">
            <b>Leaderboard</b>
          </Typography>
          <Typography variant="body1" gutterBottom>
            The most steps were taken this week by:
          </Typography>
          <StepLeaderBoard />
          <Typography variant="body1" gutterBottom>
            The most yield (all-time) was earned by:
          </Typography>
          <YieldLeaderBoard />
        </Paper>
        <Box sx={{ height: 10 }} />
        <Paper style={{ padding: '10px' }}>
          <Typography variant="h5" gutterBottom component="div">
            <b>Support us</b>
          </Typography>
          <Box sx={{ height: 10 }} />
          <Typography variant="body1" gutterBottom>
            Show some love and share us on different social channels
          </Typography>
          <div>
            <Link
              href={{
                pathname: '/',
                query: { modal: 'share' },
              }}>
              <Button color="secondary" variant="outlined">
                Share
              </Button>
            </Link>
          </div>
        </Paper>
        <Box sx={{ height: 10 }} />
        <Paper style={{ padding: '10px' }}>
          <Typography variant="h5" gutterBottom component="div">
            <b>NFT Collection / OpenSea</b>
          </Typography>
          <Typography variant="body1" gutterBottom>
            You&apos;ll receive a starship NFT on registration. View the full
            collection and trade starships on the following networks:
          </Typography>
          <div>
            <ButtonGroup size="large" aria-label="large button group">
              <a
                rel="noreferrer"
                target={'_blank'}
                href={`https://testnets.opensea.io/assets?search[query]=${getAddress(
                  80001,
                  'Starship'
                )}`}>
                <Button color="secondary" variant="outlined">
                  Mumbai
                </Button>
              </a>
            </ButtonGroup>
          </div>
        </Paper>
        <Box sx={{ height: 10 }} />
        <Paper style={{ padding: '10px' }}>
          <Typography variant="h5" gutterBottom component="div">
            <b>Subscribe to our EPNS Channel</b>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Keep up-to-date with the latest events across your chosen universes.
          </Typography>
          <Alert severity="warning">only available on testnet kovan</Alert>
          <Box sx={{ height: 10 }} />
          <div>
            <EpnsButtonNoSSR />
          </div>
        </Paper>
      </Container>
    </PageWrapper>
  );
}
