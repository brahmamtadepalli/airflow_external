/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* global stateColors */

import React from 'react';
import {
  Flex,
  Text,
  Box,
  Tooltip,
  Center,
} from '@chakra-ui/react';

import { useContainerRef } from '../../../context/containerRef';
import { getDuration, formatDuration } from '../../../../datetime_utils';
import Time from '../../../Time';

const Timeline = ({
  startDate,
  endDate,
  queueDate,
  state,
  width = 100,
  isOverall = false,
  showDates = false,
}) => {
  const containerRef = useContainerRef();

  const isStateFinal = ['success', 'failed', 'upstream_failed', 'skipped'].includes(state);
  const queuedTime = getDuration(queueDate, startDate);
  const executionTime = getDuration(startDate, endDate);
  const elapsedTime = getDuration(queueDate, endDate);
  return (
    <Center position="relative" width="150px" mb={6} color="gray.400">
      <Box position="absolute" left="3px" bottom="-22px" textAlign="center">
        <Text fontSize="xs">|</Text>
        <Text fontSize="sm"><Time dateTime={queueDate} format="HH:mm:ss" /></Text>
      </Box>
      <Box position="absolute" right="3px" bottom="-22px" textAlign="center">
        <Text fontSize="xs">|</Text>
        <Text fontSize="sm"><Time dateTime={endDate} format="HH:mm:ss" /></Text>
      </Box>
      <Tooltip
        label={(
          <>
            {!queueDate && !startDate && !endDate && (<Text>Instance has not started yet.</Text>)}
            {showDates && (
              <>
                {queueDate && (
                <Text>
                  Queued:
                  {' '}
                  <Time dateTime={queueDate} />
                </Text>
                )}
                {startDate && (
                <Text>
                  Started:
                  {' '}
                  <Time dateTime={startDate} />
                </Text>
                )}
                {endDate && isStateFinal && (
                <Text>
                  Ended:
                  {' '}
                  <Time dateTime={endDate} />
                </Text>
                )}
                <br />
              </>
            )}
            <Text>
              Queued Time:
              {' '}
              {formatDuration(getDuration(queueDate, startDate))}
            </Text>
            <Text>
              {isOverall}
              Duration:
              {' '}
              {formatDuration(getDuration(startDate, endDate))}
            </Text>
            <Text>
              Total Elapsed Time:
              {' '}
              {formatDuration(getDuration(queueDate, endDate))}
            </Text>
          </>
      )}
        hasArrow
        portalProps={{ containerRef }}
        placement="bottom"
        openDelay={100}
      >
        <Flex maxWidth={`${width}px`} height={6} borderRadius={3}>
          <Box height="100%" bg={stateColors.queued} opacity={0.3} width={`${(queuedTime / elapsedTime) * width}px`} minWidth={2} />
          <Box height="100%" bg={stateColors[state]} width={`${(executionTime / elapsedTime) * width}px`} minWidth={2} />
        </Flex>
      </Tooltip>
    </Center>
  );
};

export default Timeline;
